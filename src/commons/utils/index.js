import jwt from 'jsonwebtoken'
const bcrypt = require('bcrypt');
var TOTAL_PWD_ROUNDS = 10;


class Utils {
	constructor() {}


	/**
	 * The createJWTtoken method will create Json Web Token for apikey/login instavc-2.0 
	 * @param doc: details need to encrypt in the token
	 * @author  pradeep
	 * @version 2.0
	 */
	createJWTtoken(details, subject) {
		return jwt.sign(details, process.env.JTW_SECRET, { expiresIn: '1h', subject: subject });
	}

	/**
	 * The verifyJWTtoken method will Verify Json Web Token instavc-2.0 
	 * @param token: JWT token need to verify
	 * @author  pradeep
	 * @version 2.0
	 */
	async verifyJWTtoken(token, subject) {
		if (!token)
			return ({
				status: false,
				result: {message:'Invalid Token'}
			});

		const result = await new Promise(function (resolve) {
			jwt.verify(token, process.env.JTW_SECRET, {subject:subject}, function (err, decoded) {				
				if (err || decoded == null)
					resolve({
						status: false,
						result: {message:err}
					})
				else {
					console.log(decoded)
					resolve(({
						status: true,
						result: decoded
					}))
				}
			});
		})
		return result;
	}

	asyncverifyJWTtoken(token, subject, cb) {
		if (!token)
			cb && cb ({
				status: false,
				result: { message: 'Invalid Token', isInvalidToken: true }
			});

		// const result = await new Promise(function (resolve) {
			jwt.verify(token, process.env.JTW_SECRET, { subject: subject }, function (err, decoded) {
				if (err || decoded == null)
					cb && cb({
						status: false,
						result: { message: err }
					})
				else {
					cb && cb({
						status: true,
						result: decoded
					})
				}
			});
		// })
		// return result;
	}
	
	/**
	 * The createPasswordHash method will encrypt password in instavc-2.0 
	 * @param pwd: PWD that needs to be hashed
	 * @author  pradeep
	 * @version 2.0
	 */
	generatePassword() {
		return Math.random().toString(36).substring(3);
	}

	/**
	 * The createPasswordHash method will encrypt password in instavc-2.0 
	 * @param pwd: PWD that needs to be hashed
	 * @author  pradeep
	 * @version 2.0
	 */
	createPasswordHash(pwd) {
		return bcrypt.hashSync(pwd, TOTAL_PWD_ROUNDS);
	}

	/**
	 * The verifyPasswordHash method will compare encrypted pwd with hash from DB in instavc-2.0 
	 * @param pwd: PWD hash that needs to be verified
	 * @param hash: hash that needs to be compared
	 * @author  pradeep
	 * @version 2.0
	 */
	verifyPasswordHash(pwd, hash) {
		if (!pwd || !hash)
			return {
				status: false,
				result: {message:"Invalid Username/Password"}
			};

		if (bcrypt.compareSync(pwd, hash)) {
			return {
				status: true
			}
		} else {
			return {
				status: false,
				result: {message:"Invalid Username/Password"}
			};
		}
	}
}

var utils = new Utils();
export default utils;