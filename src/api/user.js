import { apiUrl, axios } from "@/api/api.js";
// import { fetchFormPermissions } from '@/api/form';
//import { PAGE_SIZE } from '@/constants/common';
import { generateErrors } from "@/utils/helpers";

export const me = async () => {
  try {
    // const { data: { data, included } } = await axios.get(`${apiUrl}/user/me?include=role,organization,permissions`);
    // const { attributes, id, relationships } = data;
    // const userOrg = included.find(item => item.id === relationships.organization.data.id);
    // const userPermissions = [...relationships.permissions.data];
    // const canFormPermissions = userPermissions.filter((permission) => ['formReadOwn', 'formWriteOwn'].includes(permission.id));
    //
    // let formPermissions = {};
    // if (canFormPermissions) {
    //     const { data: dataPermissions, included: includedPermissions } = await fetchFormPermissions(id);
    //
    //     if (dataPermissions) {
    //         formPermissions = jsonApiListParser(dataPermissions, includedPermissions);
    //     }
    // }
    //
    // return {
    //     id: id,
    //     email: attributes.email,
    //     firstName: attributes.firstName,
    //     lastName: attributes.lastName,
    //     secondName: attributes.patronymic,
    //     organization: userOrg?.attributes.publicName,
    //     userPermissions,
    //     formPermissions,
    //     orgId: relationships.organization.data.id,
    //     organizationObj: userOrg,
    //     role: included.find(item => item.type === 'role')
    // };
    return;
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.err(error);
    generateErrors(error);
  }
};

export const getUserById = async userId => {
  try {
    const result = await axios.get(`${apiUrl}/user/${userId}`, {
      params: {
        include: "organization,role,organization.parent,permissions"
      }
    });

    return {
      data: result.data.data,
      included: result.data.included
    };
  } catch (error) {
    generateErrors(error);
  }
};
