export const translations = {
  en: {
    password: "Password",
    username: "Username",
    auth: {
      login: "Login",
      welcome: "Welcome to Shakee!",
      dontHaveAccount: "You don't have any account?",
      pressHere: "Press here!",
      signUp: "Sign Up",
      step1Alert:
        "Please enter your personal email address to create an account. Note: Each email address can only be associated with one account.",
      step2Alert:
        "In this step, you need to create your username and password. There are some requirements here:",
      usernameAlert:
        "• Username must not contain special characters such as %, $, #, @, !, etc. The . and _ characters are allowed.",
      passwordAlert:
        "• Password must be at least 8 characters long and contain at least one letter, one number, and one uppercase letter.",
      step3Alert:
        "Choose a profile picture, or continue with the default avatar.",
      chooseAvatar: "Choose picture",
      changeAvatar: "Change picture",
      avatarPreview: "Profile picture preview",
      invalidEmail: "Enter a valid email address.",
      emailAlreadyExists: "An account with this email already exists.",
      emailCheckFailed: "We couldn't check this email. Please try again.",
      invalidUsername: "Use only letters, numbers, periods, and underscores.",
      invalidPassword:
        "Use at least 8 characters, including an uppercase letter and a number.",
      requiredPassword: "Enter your password.",
      loginFailedTitle: "Login failed",
      loginFailedMessage:
        "The email or password is incorrect. Please try again.",
      signUpFailedTitle: "Sign-up failed",
      signUpFailedMessage: "We couldn't create your account. Please try again.",
      signOut: "Sign out",
      signOutFailedTitle: "Sign-out failed",
      signOutFailedMessage: "We couldn't sign you out. Please try again.",
      nextStep: "Go to next step",
      finalSignUp: "Finish the registetration",
    },
    home: {
      emptyInbox:
        "There are no messages at the moment, start by sending the first message.",
      title: "Home",
      addContact: "Add contact",
      addContactUnavailableTitle: "Coming soon",
      addContactUnavailableMessage: "Adding contacts is not available yet.",
    },
  },
  vi: {
    password: "Mật khẩu",
    username: "Tên tài khoản",
    auth: {
      login: "Đăng Nhập",
      welcome: "Chào mừng bạn đến với Shakee!",
      dontHaveAccount: "Bạn chưa có tài khoản nào?",
      pressHere: "Bấm vào đây!",
      signUp: "Đăng Ký",
      step1Alert:
        "Bạn hãy nhập email cá nhân của mình vào để tiến hành đăng ký tài khoản. Lưu ý: Mỗi email chỉ được sử dụng cho 1 tài khoản duy nhất.",
      step2Alert:
        "Ở bước này, bạn cần tạo tên tài khoản và mật khẩu. Có một vài yêu cầu sau:",
      usernameAlert:
        "• Tên tài khoản không được chứa các kí tự đặc biệt như %, $, #, @, !,... Có thể chấp nhận dấu . và _",
      passwordAlert:
        "• Mật khẩu phải có ít nhất 8 kí tự, bao gồm ít nhất 1 chữ, 1 số và 1 kí tự in hoa.",
      step3Alert: "Chọn ảnh đại diện hoặc tiếp tục với ảnh đại diện mặc định.",
      chooseAvatar: "Chọn ảnh",
      changeAvatar: "Đổi ảnh",
      avatarPreview: "Xem trước ảnh đại diện",
      invalidEmail: "Hãy nhập địa chỉ email hợp lệ.",
      emailAlreadyExists: "Email này đã được đăng ký tài khoản.",
      emailCheckFailed: "Không thể kiểm tra email. Vui lòng thử lại.",
      invalidUsername:
        "Chỉ sử dụng chữ cái, chữ số, dấu chấm và dấu gạch dưới.",
      invalidPassword: "Dùng ít nhất 8 ký tự, bao gồm chữ in hoa và chữ số.",
      requiredPassword: "Hãy nhập mật khẩu.",
      loginFailedTitle: "Đăng nhập thất bại",
      loginFailedMessage: "Email hoặc mật khẩu không đúng. Vui lòng thử lại.",
      signUpFailedTitle: "Đăng ký thất bại",
      signUpFailedMessage: "Không thể tạo tài khoản. Vui lòng thử lại.",
      signOut: "Đăng xuất",
      signOutFailedTitle: "Đăng xuất thất bại",
      signOutFailedMessage: "Không thể đăng xuất. Vui lòng thử lại.",
      nextStep: "Bước tiếp theo",
      finalSignUp: "Hoàn thành đăng ký",
    },
    home: {
      emptyInbox:
        "Hiện tại không có tin nhắn nào, hãy gửi tin nhắn đầu tiên ngay.",
      title: "Trang Chủ",
      addContact: "Thêm liên hệ",
      addContactUnavailableTitle: "Sắp ra mắt",
      addContactUnavailableMessage:
        "Tính năng thêm liên hệ hiện chưa khả dụng.",
    },
  },
} as const;
