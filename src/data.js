import Vue from 'vue';

export default new Vue({
  data () {
    return {
      token: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNmNDQ5NTc1M2U1NGE5MGIwZTgzNjI3Nzk3YTk4YWJjZDEwZDU2MDgzZjM0NWI1OGEwNjM1MTYxMTYyYzE5Yzk5OWRmOTQ1MjExNTNhYTY3In0.eyJhdWQiOiI5IiwianRpIjoiM2Y0NDk1NzUzZTU0YTkwYjBlODM2Mjc3OTdhOThhYmNkMTBkNTYwODNmMzQ1YjU4YTA2MzUxNjExNjJjMTljOTk5ZGY5NDUyMTE1M2FhNjciLCJpYXQiOjE1NjI2NzI3MzgsIm5iZiI6MTU2MjY3MjczOCwiZXhwIjoxNTk0Mjk1MTM4LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.kZww-X7v7Rg724cIRZREjKaVA-tCOYayCoOap5JNlBE-ahhImofIOTOJbt9YTgUTlHrEkiulGDipdFgn8lymLor87em_LRpbMQgiIESIn6ScUL6-E-LMlI2thdGfBhilPsqMM3qHPIOPQAMi4X6YOcRwDsHqoutsdVA0VrmWYV11VUua5RZ6lpaXGA1w7In-OQyqKhFV4XNSjywouZQnQH4tAMD7gQVXU6yKVGcqhJLC4Z8gqc4vvlFfb-HIYIbKoVl-KCFlg1PU0jrWBJrcezACxBTzjHKktrzR_uYNpUepmAvE1_XgA8txNPpIm-BMsCm9xu3h1ojgVdSmC55YoZ5uYe41BLC_qaXwa-uq-VBL47KWDSq_X1B7cxQQjQF1siroc_ixwv0bbiDNotbNdoknY1my9XQ3xsmi1X_ozXjszWfzjU5983r3EpKUksnyLKPXZE8mY21kpIaou6g3Fyk2xXBOUxBWfPiJvB0V5Q8LbdCuOSfWa5mOkFROMZrrKuDI3rzKKIes1aMCyi3Nd1qll0bAHfumKwYerM1gL3QXik9seJ8X8lWS_7EessqzExqzy6-h-FbNhubmdKxhBdv2sRql7aQmQLn57uwayg_XfhCH-aaWDRmubnEYVSIHydso2p6PH-E7ehipjwvynXkPWNk7I1fvDXv0dPyU0X8',
      path: {
        stocks_move: 'https://admin.cameramate.com/api/stocks_move?with[]=product.descriptions',
        // stocks_move: '../static/tmpData/moves.json',
        store: 'https://admin.cameramate.com/api/stocks?filterGroups[0][field]=parent_id&filterGroups[0][filters][0][value]=0&filterGroups[0][filters][0][condition]=EQUAL&filterGroups[0][filters][0][type]=stringfilter&filterGroups[0][filters][0][operator]=or&filterGroups[0][operator]=and',
        site: ['https://admin.cameramate.com/api/stocks/', '?with[]=children'],
        rack: ['https://admin.cameramate.com/api/stocks/', '?with[]=children']
      }
    }
  },
  methods: {
  //   filterUtil(data, filters) {
  //     let res = [];
  //
  //     data.forEach(function (data_item) {
  //
  //       let tmp_item;
  //
  //       filters.forEach(function (filter_item) {
  //
  //         if (filter_item.path.split(".").length <= 1 && filter_item.path.split("[").length <= 1) {
  //
  //
  //           console.log(typeof data_item[filter_item.path].toString());
  //
  //
  //           if (data_item[filter_item.path].toString().includes(filter_item.item)) {
  //             tmp_item = data_item;
  //           } else {
  //             console.error("sldjkfnvfjlskdnvsldjkfnvskdjfnvsdjkvnsdljvn");
  //             tmp_item = null;
  //           }
  //
  //
  //
  //
  //
  //         } else {
  //
  //           let data_item_child = data_item;
  //
  //           filter_item.path.split(".").forEach(function (path_item) {
  //
  //             if (path_item.split("[").length == 1) {
  //
  //               data_item_child = data_item_child[path_item]
  //
  //             } else {
  //
  //               let node_name = path_item.split("[")[0];
  //               let node_child = path_item.split("[")[1].split("]")[0];
  //
  //               data_item_child = data_item_child[node_name];
  //               data_item_child = data_item_child[node_child];
  //
  //             }
  //
  //           })
  //
  //           if (data_item_child.toString().toLowerCase().includes(filter_item.item.toLowerCase())) {
  //             tmp_item = data_item;
  //           } else {
  //             console.error("sldjkfnvfjlskdnvsldjkfnvskdjfnvsdjkvnsdljvn");
  //             tmp_item = null;
  //           }
  //
  //         }
  //
  //       });
  //
  //       if (tmp_item !== null) {
  //         res.push(tmp_item);
  //       }
  //
  //       tmp_item = null;
  //     });
  //
  //     return res;
  //   }
  //

    filterUtil(data, filters) {
      let res = [];

      for (let item of data) {
        if (this.isItemValid(item, filters)) {
          res.push(item)
        }
      }

      return res;
    },
    isItemValid(item, filters) {
      let valid = true;

      for (let filter of filters) {

        if (this.isComplex(filter.path)) {

          let child = this.getPropByPath(item, filter.path);

          if (valid) {
            valid = (child.toString().toLowerCase().includes(filter.item.toString().toLowerCase()));
          }

        } else {
          if (valid) {
            valid = (item[filter.path].toString().toLowerCase().includes(filter.item.toString().toLowerCase()));
          }
        }
      }

      return valid;
    },
    isComplex(item) {
      return (item.split("[").length > 1 || item.split(".").length > 1);
    },

    getPropByPath(item, path) {
      let prop = item;

      if (this.isComplex(path)) {
        path.split(".").forEach(function (path_item) {

          if (path_item.split("[").length == 1) {

            prop = prop[path_item]

          } else {

            let node_name = path_item.split("[")[0];
            let node_child = path_item.split("[")[1].split("]")[0];

            prop = prop[node_name];
            prop = prop[node_child];

          }
        })
      }

      return prop;
    },

    defineActiveProps(data) {

      let res = {
        types: [],
        froms: [],
        toos: []
      }

      let [typePath, fromPath, toPath] = ['stocks_move_type', 'stocks_move_from', 'stocks_move_to'];

      for (let item of data) {

        let [type, from, to] = [item[typePath], item[fromPath], item[toPath]];

        res.types.includes(type) ? null : res.types.push(type);
        res.froms.includes(from) ? null : res.froms.push(from);
        res.toos.includes(to) ? null : res.toos.push(to);

      }

      return res;

    }
  }

});
