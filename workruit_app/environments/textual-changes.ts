export const authDataInfo = {
  authInfo: {
      signUpTitle: "Sign up for free.",
      signUpSubTitle: "Sign up here:",
      reSetTitle: "Forgot your password?",
      reSetSubTitle: "We'll email you instructions on how to reset it.",
      loginTitle: "Welcome back.",
      loginSubTitle: "Sign into your account here:",
      loginText:"Sign in",
      resetText:"Reset Password",
      signUpText:"Sign up",
      reSetText: "Forgot password?",
      loginSubText:"Don’t have an account? ",
      resetSubText:"Already have an account?",
      signUpSubText:"Already have an account?",
      rightContentTitle: "Find a candidate that fits for free!",
      rightContentTitle_fp: "Find the right person on the go.",
      rightContentSubTitle:"The right candidate for your company is",
      rightContentSubTitle_1:"just around the corner.",
      rightContentBtnText:"Get the app",
      rightContentImage: "/assets/images/auth/phone.png",
      formLogo: "/assets/images/auth/logo.svg",
      supportText: 'Document Management Console',
      // tslint:disable-next-line:max-line-length
      supportParagraph1: "PlusMax Group is an International Duty-Free trading group with strategic presence at all leading entry and exit points including airports, seaport, international ferry terminal, border towns and popular tourist destinations across the globe. A leading lifestyle duty free retailer and trading company delivering a comprehensive range of services from Duty Free Outlets, Shipping & Logistics,Distribution & Manufacturing, Oil & Gas, Hotel & Properties, Education and a own private."
  },
  placeHolders: {
    loginUserName: "Email address",
    loginPassword: "Password",
    signUpFirstName: "First Name",
    signUpLastName: "Last Name",
    signUpWorkEmail: "Work Email",
    signUpPassword: "Password",
    signUpPhoneNumber: "Phone Number",
    signUpCompanyName: "Company Name",
    oldPassword: "Old Password",
    newPassword: "New Password",
    reEnterNewPassword: "Re-Enter New Password",
    companyName: "Company Name",
    facebook:"Facebook",
    linkedin:"Linkedin",
    twitter:"Twitter",
    industry:"Industry",
    location:"Location",
    website:"Website"
  },
  errorMessages: {
    loginEmailError: "Email is required.",
    loginPasswordError: "Password is required.",
    signUpFirstNameError: "First Name is required.",
    signUpLastNameError: "Last Name is required.",
    signUpWorkEmailError: "Work Email is required.",
    signUpPasswordError: "Password is required.",
    signUpPhoneNumberError: "Phone Number is required.",
    signUpCompanyNameError: "Company Name is required.",
    oldPasswordError: "Old Password is required.",
    newPasswordError: "New Password is required.",
    reEnterNewPasswordError: "Re-Enter New Password is required.",
    companyNameError: "Company Name is required.",
    facebookError: "Facebook is required.",
    twitterError: "Twitter is required.",
    linkedInError: "LinkedIn is required.",
    websiteError: "Website is required.",
  },
  successMessages: {
    jobChanges: "Job Changed Successfully",
},
  menuNames: {
    applicants: "Applicants",
    applicantsLink: "/applicant",
    activity: "Activity",
    activityLink: "/activity",
    jobs: "Jobs",
    jobsLink: "/jobs",
    interviews: "Interviews",
    interviewsLink: "/interviews",
  },
  headerActions: {
    leftActions: [
      {
        title: 'Applicants',
        link: '/applicant',
      },
      {
        title: 'Activity',
        link: '/activity',
      },
      {
        title: 'Jobs',
        link: '/jobs',
      },
      {
        title: 'Interviews',
        link: '/interviews',
      },
    ],
    rightActions: [
      {
        title: 'My Profile',
        link: '/viewProfile',
      },
      {
        title: 'Company Profile',
        link: '/viewProfile',
      },
      {
        title: 'Notifications',
        link: '/viewProfile',
      },
      {
        title: 'Contact Support',
        link: '/interviews',
      },
      {
        title: 'Download App',
        link: '/interviews',
      },
      {
        title: 'Sign Out',
        link: '/login',
        isClick: true
      },
     
    ]
},
  tabs: {
    activity: [
      {
        name: 'Intrested',
        active: true,
        link: '/interviews',
      },
      {
        name: 'Saved',
        active: false,
        link: 'tab1',
      },
      {
        name: 'Matched',
        active: false,
        link: '/matched',
      } 
    ],
    jobs: [
      {
        name: 'Active',
        active: true,
        link: 'tab1',
      },
      {
        name: 'Pending',
        active: false,
        link: 'tab1',
      },
      {
        name: 'Closed',
        active: false,
        link: 'tab1',
      } 
    ],
    interviews: [
      {
        name: 'Scheduled',
        active: true,
        link: 'tab1',
      },
      {
        name: 'Hired',
        active: false,
        link: '/hirerejectprofile',
      },
      {
        name: 'Rejected',
        active: false,
        link: '/hirerejectprofile',
      } 
    ],
    signUp: [
      {
        name: 'Company Profile',
        active: true,
        link: 'tab1',
      }
    ],
    viewProfile: [
      {
        name: 'My Profile',
        active: true,
        link: '/viewProfile',
        isCount: false
      },
      {
        name: 'Company Profile',
        active: false,
        link: '/viewProfile',
        isCount: false
      },
      {
        name: 'Notifications',
        active: false,
        link: '/viewProfile',
      } 
    ],
},
tableColumns: {
  intrestedProfile: [
    {
      header: 'Name',
      headerKey: 'firstname'
    },
    {
      header: 'Job',
      headerKey: 'title',
      isLink: true,
    },
    {
      header: 'Date',
      headerKey: 'candidateJobActionDate'
    } 
  ],
  jobs: [
    {
      name: 'Active',
      active: false,
      link: 'tab1',
    },
    {
      name: 'Pending',
      active: false,
      link: 'tab1',
    },
    {
      name: 'Closed',
      active: false,
      link: 'tab1',
    } 
  ],
  interviews: [
    {
      name: 'Scheduled',
      active: false,
      link: 'tab1',
    },
    {
      name: 'Hired',
      active: false,
      link: 'tab1',
    },
    {
      name: 'Rejected',
      active: false,
      link: 'tab1',
    } 
  ]
},
messages: {
      welcome_title: 'Welcome to Workruit!',
      welcome_subTitle: 'You can start by posting a new',
      welcome_subTitle_1: 'job, clicking on the button below.',
      post_btnTitle: 'Post a job',
      intrested_title: 'No Interested Profiles',
      intrested_subTitle: 'When you like applicants, you’ll be able to review their profiles here.',
      matched_title: 'No New Matches',
      matched_subTitle: 'When you match with applicants, you’ll be able to review their profiles here.',
      saved_title: 'No Saved Applicantss',
      saved_subTitle: 'Shortlist top profiles now and like their profiles within 7 days.',
      scheduled_title: 'No Scheduled Interviews',
      scheduled_subTitle: 'You are yet to schedule interviews.',
      hired_title: 'No Applicants Hired',
      hired_subTitle: 'Yet to hire? Let us get back to you with most relevant applicants.',
      rejected_title: 'No Applicants Rejected',
      rejected_subTitle: 'You have no rejected applicants.',
    }
};