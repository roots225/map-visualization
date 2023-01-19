import userUserStore from "@/store/modules/user";
const userStore = userUserStore();

export default {
    inserted(element: any, binding: any) {
        const { value } = binding;
        const permissions = userStore.permissions;
        if (value && value instanceof Array && value.length > 0) {
            const hasPermission = permissions.some((role) =>
                value.includes(role)
            );
            if (!hasPermission)
                element.parentNode && element.parentNode.removeChild(element);
        }
    },
};
