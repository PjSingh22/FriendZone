from flask import Blueprint, jsonify, session, request
from app.models import User, friendships, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from .user_routes import add_friend
from sqlalchemy import insert
auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            profile_picture_url='https://cdn.discordapp.com/attachments/1114339565491200170/1115050230333849721/5770f01a32c3c53e90ecda61483ccb08.png',
            cover_photo_url='https://cdn.discordapp.com/attachments/1114339565491200170/1115064534189744128/9k.png',
            email=form.data['email'],
            password=form.data['password'],
            date_of_birth=form.data['date_of_birth'],
            gender=form.data['gender'],
        )
        db.session.add(user)
        db.session.commit()
        new_user = user.to_dict()
        # friendship = insert(friendships).values(userA_id=new_user["id"], userB_id=4)
        # db.session.execute(friendship)
        # db.session.commit()
        # friendship = insert(friendships).values(userA_id=new_user["id"], userB_id=5)
        # db.session.execute(friendship)
        # db.session.commit()
        # friendship = insert(friendships).values(userA_id=new_user["id"], userB_id=6)
        # db.session.execute(friendship)
        # db.session.commit()
        # friendship = insert(friendships).values(userA_id=new_user["id"], userB_id=7)
        # db.session.execute(friendship)
        # db.session.commit()
        login_user(user)
        add_friend(4)
        add_friend(5)
        add_friend(6)
        add_friend(7)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
