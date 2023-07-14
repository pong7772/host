import axios from 'axios';
import { toast } from 'react-toastify';
export const fetchData = async (url, parameter = {}, method = "POST") => {
    const user = JSON.parse(localStorage.getItem('users'));
    let isAuth = false;
    let full_url = process.env.NEXT_PUBLIC_BACKEND_URL + url;
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    let params = parameter;
    if (user) {
        isAuth = true;
        if (!isEmpty(user.token)) {
            let token =  user.token;
            headers = {
                Authorization: `Bearer ${token}`, // user.access_token from local storage and params.access_token 
            }
        }
    }

    // if (params.is_form_data) {
    //     delete params.is_form_data;
    //     var formData = new FormData();
    //     for (const key in params) {
    //         formData.append(key + "", params[key]);
    //     }
    //     params = formData;
        
    // }
    return axios({
        method: method,
        url: full_url,
        data: params,
        headers: headers
    }).then(res => {
        if (res && res.data) {
            return res.data
        }
    }).catch(err => {
        if (err.response && err.response.status) {
            var status = err.response && err.response.status;
            if (status === 401) {
                if (isLogin) {
                    toast.error("Unauthorized", {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            } else if (status === 405) {
                var { data } = err.response;
                if (data) {
                    toast.error(data.message, {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error("Method not allowed", {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }

            } else if (status === 404) {
                toast.error("Not found", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (status === 500) {

                toast.error("Server error", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
               
            } else if (status === 501) {
            
                toast.error("Server error", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }
            else if (status === 400) {
                var { data } = err.response;
                if (data) {
                    toast.error(data.message, {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error("Bad request", {
                         position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }

            } else {
            message.warning("Can not connect server");
            return false;
        }
    }
    })
}

// other helper methods

export const formatDateClient = (date) => {
    return moment(date).format("DD/MM/YYYY");
}
export const formatDateServer = (date) => {
    return moment(date).format("YYYY-MM-DD");
}
export const formatDateServerAndTime = (date) => {
    return moment(date).format("YYYY-MM-DD hh:mm");
}

export const isEmpty = (obj) => {
    if (obj === null || obj === undefined || obj === "") return true;
    if (obj === "null" || obj === "undefined") return true;
    // if (obj.length > 0) return false;
    // if (obj.length === 0) return true;
    // if (typeof obj !== 'object') return true;
    // for (var key in obj) {
    //     if (hasOwnProperty.call(obj, key)) return false;
    // }
    return false;
};

export const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item,
        };
    }, initialValue);
};

export const isHasPermission = permissionName => {
    const { role } = JSON.parse(localStorage.getItem('users'));
    if (role === "Admin") {
        return true;
    }
    if (role === "Student"){
        return false;
    }
};