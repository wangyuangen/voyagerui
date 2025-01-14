import * as SignalR from '@microsoft/signalr';
import { useUserInfo } from '/@/stores/userInfo'
import { ElNotification } from 'element-plus';

// 初始化SignalR对象
const connection = new SignalR.HubConnectionBuilder()
	.configureLogging(SignalR.LogLevel.Information)
	.withUrl(`${import.meta.env.VITE_API_URL}/hub/notifications`, { 
		transport: SignalR.HttpTransportType.WebSockets, 
        skipNegotiation: true,
		accessTokenFactory:()=>useUserInfo().getToken()
    })
	.withAutomaticReconnect({
		nextRetryDelayInMilliseconds: () => {
			return 5000; // 每5秒重连一次
		},
	})
	.build();

connection.keepAliveIntervalInMilliseconds = 15 * 1000; // 心跳检测15s
connection.serverTimeoutInMilliseconds = 30 * 60 * 1000; // 超时时间30m

// 启动连接
connection.start().then(() => {
	window.console.log('启动连接');
});
// 断开连接
connection.onclose(async () => {
	window.console.log('断开连接');
});
// 重连中
connection.onreconnecting(() => {
	ElNotification({
		title: '提示',
		message: '服务器已断线...',
		type: 'error',
		position: 'bottom-right',
	});
});
// 重连成功
connection.onreconnected(() => {
	window.console.log('重连成功');
});

export { connection as signalR };

