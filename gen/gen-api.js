const { generateApi } = require('swagger-typescript-api')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const ejs = require('ejs')

const apis = [
  {
    output: path.resolve(__dirname, '../src/api/console'),
    url: 'http://localhost:8000/admin/swagger/console/swagger.json',
    enumUrl: 'http://localhost:8000/api/console/tool/all-enums',
  }
]

const genEnums = async (api) => {
  console.log(`✨   try to get enums by URL "${api.enumUrl}"`)
  console.log(`⭐   start generating your typescript api`)
  const res = await axios.get(api.enumUrl).catch((error) => {
    console.error(error)
  })

  if (res.data?.data?.length > 0) {
    let outputPath = path.resolve(__dirname, '../src/api/domain');
    ejs.renderFile(path.resolve(__dirname, './templates/enum-contracts.ejs'), res.data, {}, function (err, content) {
      fs.writeFile(path.resolve(outputPath + '/enum-contracts.ts'), content, (err) => {})
      console.log(`✅   api file "enum-contracts.ts" created in ${outputPath}\n`)
    })
  }
}

apis?.forEach(async (api) => {
  if(api.enumUrl){
    await genEnums(api);
  }

  await generateApi({
    output: api.output,
    templates: path.resolve(__dirname, './templates'),
    url: api.url,
    httpClientType: 'axios',
    modular: true,
    cleanOutput: false,
    moduleNameIndex: 2, // 0 api, 1 api htt-client data-contracts, 2 apis htt-client data-contracts
    moduleNameFirstTag: true, //apis htt-client data-contracts
    unwrapResponseData: true,
    generateUnionEnums: true,
    defaultResponseType: 'AxiosResponse',
  }).catch((error) => console.error(error))
})
