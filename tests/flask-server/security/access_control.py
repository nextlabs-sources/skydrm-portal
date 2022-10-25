from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from flask.json import jsonify

parser = reqparse.RequestParser()
parser.add_argument('username', help = 'This field cannot be blank', required = True)
parser.add_argument('password', help = 'This field cannot be blank', required = True)

class UserRegistration(Resource):
    @jwt_required
    def post(self):
        data = parser.parse_args()
        return data

class UserLogin(Resource):
    def post(self):
        data = parser.parse_args()
        username = data['username']
        #password = data['password']

        access_token = create_access_token(identity = username)
        refresh_token = create_refresh_token(identity = username)
        return jsonify({
            'status': 'ok',
            'access_token': access_token,
            'refresh_token': refresh_token
        })
      
class UserChangePassword(Resource):
    @jwt_required
    def post(self):
        #data = parser.parse_args()
        #username = data['username']
        #password = data['password']
        return jsonify({
            'status': 'ok',
        })

      
class UserLogout(Resource):
    def post(self):
        return jsonify({'status': 'ok','message': 'User logout'})
      
      
class UserLogoutRefresh(Resource):
    def post(self):
        return jsonify({'status': 'ok','message': 'User logout refresh'})
      
      
class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity = current_user)
        return jsonify({'access_token': access_token})     
      
        