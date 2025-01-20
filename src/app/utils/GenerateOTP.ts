export const generateOTP = (length: number): string => {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10).toString(); // Random digit between 0-9
    }
    return otp;
  };