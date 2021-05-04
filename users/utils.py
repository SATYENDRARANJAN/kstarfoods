import math
import random
from string import digits


def OTPgenerator() :
	digits_in_otp = "0123456789"
	OTP = ""

# for a 4 digit OTP we are using 4 in range
	for i in range(4) :
		OTP += digits[math.floor(random.random() * 10)]

	return OTP


def save_utm_params(user,utm_source,utm_medium,utm_campaign):
	if utm_source:
		user.utm_source=utm_source
	if utm_medium:
		user.utm_medium=utm_medium
	if utm_campaign:
		user.utm_campaign=utm_campaign
	user.save()