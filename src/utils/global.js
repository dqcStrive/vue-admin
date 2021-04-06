import { MessageBox } from 'element-ui';
import { ref } from '@vue/composition-api';

export function global(){
    const str = ref('');
    const confirm = (params) => {
        MessageBox.confirm(params.content,  params.tip || "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: params.type || "warning",
            center: true
        }).then(() => {
            str.value = params.id || '';
            params.fn && params.fn(params.id || '')
        }).catch(() => {
            params.catchFn && params.catchFn()
        });
    }

    return {
        str,
        confirm
    }
}

// export default {
//   install (Vue,options){
//     Vue.prototype.confirm = (params) => {
//       MessageBox.confirm(params.content, params.tips || '提示', {
//         confirmButtonText: '确定',
//         cancelButtonText: '取消',
//         type: params.type || 'warning',
//         center: true
//       }).then(() => {

//         params.fn && params.fn(111)

//         // root.$message({
//         //   type: 'success',
//         //   message: '删除成功!'
//         // });
//       }).catch(() => {
//         root.$message({
//           type: 'info',
//           message: '已取消删除'
//         });
//       });
//     }
//   }
// }