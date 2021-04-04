def OTPgenerator() :
	digits_in_otp = "0123456789"
	OTP = ""

# for a 4 digit OTP we are using 4 in range
	for i in range(4) :
		OTP += digits[math.floor(random.random() * 10)]

	return OTP