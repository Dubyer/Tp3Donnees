
export default class CollectionFilter {

  constructor() {
  }
  // We are going to make a filter function
  static Filter(bindedDatas, httpContext) {
    let modifiedDatas = bindedDatas;
    modifiedDatas.sort((a, b) => a.Id > b.Id ? 1 : -1);
    //modifiedDatas = this.FilterByName(modifiedDatas,httpContext);
    modifiedDatas = this.Fields(modifiedDatas, httpContext);
    modifiedDatas = this.Sort(modifiedDatas, httpContext);
    modifiedDatas = this.Limit(modifiedDatas, httpContext);
    return modifiedDatas;
  }

  // We make a static Limit function to limit the number of element in the array
  static Limit(bindedDatas, httpContext) {
    if (httpContext.path.params != undefined) {
      if (httpContext.path.params["limit"] != undefined && httpContext.path.params["offset"] != undefined) {
        let limit = httpContext.path.params["limit"];
        let offset = httpContext.path.params["offset"];
        let startIndex = limit * offset;
        var dataToReturn = [];
        for (let i = startIndex; i < parseInt(startIndex) + parseInt(limit); i++) {
          dataToReturn.push(bindedDatas[i]);
        }
        return dataToReturn;
      }
    }
    return bindedDatas;
  }

  // We make a static fields function
  static Fields(bindedDatas, httpContext) {
    if (httpContext.path.params != undefined) {
      if (httpContext.path.params["fields"] != undefined) {
        let tabOfFields = httpContext.path.params["fields"].split(',');
        let tabOfAllFields = Object.keys(bindedDatas[0]);
        let difference = tabOfAllFields.filter((element) => !tabOfFields.includes(element));
        for (let i = 0; i < bindedDatas.length; i++) {
          for (let y = 0; y < difference.length; y++) {
            delete bindedDatas[i][difference[y]];
          }
        }

        // We remove the duplicate elements in the array of objects
        const seen = new Set();
        const filteredArr = bindedDatas.filter(element => {
          let info = "";
          for (let i = 0; i < tabOfFields.length; i++) {
            info = info + element[tabOfFields[i]];
          }
          const duplicate = seen.has(info);
          seen.add(info);
          return !duplicate;
        });
        return filteredArr;
      }
    }
    return bindedDatas;
  }

  // We sort the array of objects and return it
  static Sort(modifiedDatas, httpContext) {
    if (httpContext.path.params != undefined) {
      if (httpContext.path.params["sort"] != undefined) {
        let valueSort = httpContext.path.params["sort"];
        if (valueSort.includes(",desc")) {
          valueSort = valueSort.replace(',desc', '');
          modifiedDatas.sort((nameA, nameB) => {
            if (nameA[valueSort] < nameB[valueSort]) {
              return 1;
            }
            if (nameA[valueSort] > nameB[valueSort]) {
              return -1;
            }
            return 0;
          });
        }
        else {
          modifiedDatas.sort((nameA, nameB) => {
            if (nameA[valueSort] > nameB[valueSort]) {
              return 1;
            }
            if (nameA[valueSort] < nameB[valueSort]) {
              return -1;
            }

            return 0;
          });
        }
      }
    }
    return modifiedDatas
  }
}