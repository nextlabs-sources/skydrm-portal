# import the Flask class from the flask module
from flask import Flask, render_template, redirect, url_for, request, session,g
import time ,os
import logging
from logging.handlers import RotatingFileHandler
from werkzeug.serving import run_simple
from flask.json import jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import mimetypes

# local imports
from config.config import effective_config
from flask.helpers import send_from_directory

static_folder = '../../dist/skydrm-portal'

class CustomUrlPath(object):
	def __init__(self, app):
		self.app = app

	def __call__(self, environ, start_response):
		SCRIPT_NAME = '/api'
		
		if environ['PATH_INFO'].startswith(SCRIPT_NAME):
			environ['PATH_INFO'] = environ['PATH_INFO'][len(SCRIPT_NAME):]
			environ['SCRIPT_NAME'] = SCRIPT_NAME
			return self.app(environ, start_response)
		else:
			start_response('404', [('Content-Type', 'text/plain')])
			return ["The requested URL is not found.".encode()]

# Create the application object
def create_app() -> Flask:

    app = Flask(__name__, instance_relative_config=True,
            static_url_path='', 
            static_folder=static_folder,
            template_folder='templates')

    mimetypes.add_type('text/css', '.css')
    mimetypes.add_type('text/html', '.html')
    mimetypes.add_type('text/javascript', '.js')

    # app.secret_key = os.urandom(24)
    app.config.from_object(effective_config)

    CORS(app)
    api = Api(app)

    # Setup the API endpoints
    import security as security
    api.add_resource(security.access_control.UserLogin, '/api/v1/login')
    api.add_resource(security.access_control.UserLogout, '/api/v1/logout')
    api.add_resource(security.access_control.UserChangePassword, '/api/v1/password')
    api.add_resource(security.access_control.TokenRefresh, '/api/v1/token/refresh')

    return app


# Create a Flask instance
app = create_app()
app.config['JWT_SECRET_KEY'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9'
app.config['JWT_BLACKLIST_ENABLED'] = False
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
jwt = JWTManager(app)

#@jwt.token_in_blacklist_loader
#ef check_if_token_in_blacklist(decrypted_token):
#    jti = decrypted_token['jti']
#    return models.RevokedTokenModel.is_jti_blacklisted(jti)

@app.route('/')
def root():
  #print("Root Path=" + app.root_path)
  static_path = app.root_path + "/" + static_folder
  print("Static Path=" + static_path)
  return send_from_directory(static_path, 'index.html', as_attachment=False)

# start the server with the 'run()' method
if __name__ == '__main__':
    handler = RotatingFileHandler('./logs/server.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)

#    app.logger.addHandler(handler)
#    app = CustomUrlPath(app)

    run_simple('0.0.0.0', 5000, app, use_reloader=True)
#   app.run(debug=True, host='0.0.0.0', port=5000)

