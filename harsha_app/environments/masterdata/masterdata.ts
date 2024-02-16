export const masterData = {
    appInfo: {
        appTitle: "PlusMax DMC",
        appLogo: "assets/images/plusmax-tracker_icons_plus-max-logo.png",
        supportText: 'Document Management Console',
        // tslint:disable-next-line:max-line-length
        supportParagraph1: "PlusMax Group is an International Duty-Free trading group with strategic presence at all leading entry and exit points including airports, seaport, international ferry terminal, border towns and popular tourist destinations across the globe. A leading lifestyle duty free retailer and trading company delivering a comprehensive range of services from Duty Free Outlets, Shipping & Logistics,Distribution & Manufacturing, Oil & Gas, Hotel & Properties, Education and a own private."
    },
    toastMessages: {
        loginSuccess: 'Logged In Successfully',
        setPasswordSuccess: 'Password updated Successfully',
        requestSuccess: 'Request Form Posted Successfully',
        requestFail: 'Something Went Wrong Please Try Again',
        userSuccess: 'User created Successfully',
        updateSuccess: 'updated Successfully'
    },
    errorMessages: {
        auth: {
            invalid: 'Invalid Email / Password',
            empty: 'Please enter Email & Password',
            emailEmpty: 'Please enter Email',
            passwordEmpty: 'Please enter Password',
        },
    },
    cmsTabs: ['countries', 'roles', 'stores'],
    adminMenu: [
        {
            title: "home",
            routerLink: "home",
            icon: "oi oi-monitor",
            subMenu: []
        },
        {
            title: "request",
            routerLink: "request/list",
            metatitle: 'all requests',
            icon: "oi oi-plus",
            subMenu: []
        },
        {
            title: "User",
            routerLink: "user/list",
            icon: "oi oi-person",
            subMenu: []
        },
        {
            title: "security",
            routerLink: "/location",
            icon: "oi oi-location",
            subMenu: []
        },
        {
            title: "permissions",
            routerLink: "permissions",
            icon: "oi oi-hard-drive",
            subMenu: []
        },
        {
            title: "history",
            routerLink: "/one-time",
            icon: "oi oi-command",
            subMenu: []
        },
        {
            title: "cms",
            routerLink: "cms",
            icon: "oi oi-excerpt",
            subMenu: []
        },
        {
            title: "Custome 2",
            routerLink: "/one-time",
            icon: "oi oi-command",
            subMenu: []
        },
        {
            title: "Custome 3",
            routerLink: "/one-time",
            icon: "oi oi-command",
            subMenu: []
        }
    ],
    requestForm: {
        types: [
            {
                id: 1,
                title: 'correspondence'
            },
            {
                id: 2,
                title: 'onetime'
            }
        ]
    },
    infoMessages: {
        CompanyImageUpload: 'click here to Upload company logo',
        userImageUpload: 'click here to Upload user image',
    }
};
