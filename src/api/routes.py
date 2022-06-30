"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity,jwt_required
import json



api = Blueprint('api', __name__)
# bcrypt = Bcrypt(api)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

    

@api.route('/user', methods=['POST'])
def add_new_useer():

    body = json.loads(request.data)
    
    user = User(name = body["name"], email=body["email"], password=body["password"])
    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": "user created"
    }

    return jsonify(response_body), 200


# Delete User

@api.route('/user/<int:id>/', methods=['DELETE'])
def delete_user(id):
    print(id)
    print(User)
    usuario = User.query.filter_by(name= "a").first()
    # print(usuario)
    db.session.delete(usuario)
    db.session.commit()

    response_body = {
        "msg": "user deleted"
    }

    return jsonify(response_body), 200


@api.route('/user', methods=['PUT'])
def handle_favCharacter():

    body = json.loads(request.data)
    usuario = User.query.filter_by(name= body["name"]).first()
    print(usuario)
    db.session.delete(usuario)
    db.session.commit()

    result =[]
    # print(position)
    response_body = {
        "msg": "user deleted"
    }

    return jsonify(response_body), 200


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    
    # name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    user_by_name = User.query.filter_by(name=email).first()


    if user :
        if email != user.email  or password != user.password:
            return jsonify({"msg": "Bad username or password"}), 401
        
        access_token={
            "token": create_access_token(identity=email),
            "name": user.name
        }

    print(user_by_name)
    if user_by_name:
        if email != user_by_name.name  or password != user_by_name.password:
            return jsonify({"msg": "Bad username or password"}), 401
        
        access_token={
            "token": create_access_token(identity=email),
            "name": user_by_name.name
        }



    


    return jsonify(access_token=access_token)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


if __name__ == "__main__":
    app.run()