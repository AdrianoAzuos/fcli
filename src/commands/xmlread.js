const parser = require('fast-xml-parser')
const fs = require('fs')
const options = {
	    attributeNamePrefix : "@_",
	    attrNodeName: "attr", //default is 'false'
	    textNodeName : "#text",
	    ignoreAttributes : true,
	    ignoreNameSpace : false,
	    allowBooleanAttributes : false,
	    parseNodeValue : true,
	    parseAttributeValue : false,
	    trimValues: true,
	    cdataTagName: "__cdata", //default is 'false'
	    cdataPositionChar: "\\c",
	    localeRange: "", //To support non english character in tag/attribute values.
	    parseTrueNumberOnly: false,
}

function filterData(data, propertie, value) {
	const newData = data.nfeProc
	const resolve = newData[propertie]
	const result = {}
	if(value === 'sum') {
		result.value = resolve.infNFe.total.ICMSTot.vNF
		result.nf = resolve.infNFe.ide.nNF
		return result
	} else {
		return resolve
	}
}

module.exports = {
  name: 'xmlread',
  run: async toolbox => {
	  let data = {}
	  let total = 0
	  const folderFiles = fs.readdirSync('./')
	  for (const raw in folderFiles) {
			const path = `./${folderFiles[raw]}` 
			const xmlData = fs.readFileSync(path, 'utf-8')
			const jsonData = parser.parse(xmlData, options)
			const result = filterData(jsonData, 'NFe', 'sum')
			total += result.value
			data[result.nf] = result.value
	  }

	const { print, parameters } = toolbox
	if(toolbox.parameters.options.l) {console.table(data)}
    print.success(total)
  }
}
