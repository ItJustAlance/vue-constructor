// import { apiUrl, axios } from '@/api/api.js';
// import { PAGE_SIZE } from '@/constants/common';
// import { generateErrors } from '@/main/utils/common';
//
// export const getAllRoles = async (page = 1, pageSize = PAGE_SIZE) => {
//     try {
//         const { data: { data: roles, meta, included } } = await axios.get(`${ apiUrl }/role`, { params: {
//                 page,
//                 'page-size': pageSize
//             }
//         });
//
//         return { roles, meta, included };
//     } catch (error) {
//         generateErrors(error);
//     }
// };
//
// export const getAllPermissions = async () => {
//     try {
//         const { data } = await axios.get(`${ apiUrl }/permission`, {
//             // TODO переделать на серверную пагинацию
//             params: {
//                 'page-size': PAGE_SIZE,
//                 sort: 'name'
//             }
//         });
//         return data;
//     } catch (error) {
//         generateErrors(error);
//     }
// };
//
// export const getRoleByName = async (roleName) => {
//     try {
//         const { data } = await axios.get(`${apiUrl}/role/${roleName}?include=permissions`);
//         return data;
//     } catch (error) {
//         generateErrors(error);
//     }
// }
//
// export const createNewRole = async (newRoleData) => {
//     try {
//         const result = await axios.post(`${apiUrl}/role`, newRoleData);
//
//         return result
//     } catch (error) {
//         generateErrors(error);
//     }
// };
//
// export const patchRole = async (data, roleName) => {
//     console.log('patchRole data', data, roleName);
//     try {
//         if (!data) {
//             throw new Error('Обработанный текст ошибки');
//         }
//         const response = await axios.patch(`${apiUrl}/role/${roleName}`, data)
//
//         return response.data.data
//     } catch (error) {
//         generateErrors(error);
//     }
// };
//
// export const deleteRole = async id => {
//     try {
//         const response = await axios.delete(`${apiUrl}/role/${id}`);
//
//         return response;
//     } catch (error) {
//         generateErrors(error);
//     }
// }
