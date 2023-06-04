from .db import db, environment, SCHEMA, add_prefix_for_prod
from .friendship import friendships
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    """
    create a user model

    documentation:
      - self referential many-to-many: https://docs.sqlalchemy.org/en/20/orm/join_conditions.html#self-referential-many-to-many
    """
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable = False)
    last_name = db.Column(db.String(50), nullable = False)
    profile_picture_url = db.Column(db.String(255), nullable = False)
    cover_photo_url = db.Column(db.String(255), nullable = False)
    date_of_birth = db.Column(db.Date, nullable = False)
    gender = db.Column(db.String, nullable = False)
    age = db.Column(db.Integer, nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    # should created at be string formate and we can do all the date manipulation on the font end?
    # we need to be consistent with what were putting into the db
    posts = db.relationship('Post', back_populates='user')
    likes = db.relationship('Post', secondary="likes",  back_populates="likes")

    # friendships = db.relationship('Friendship', back_populates='user')
    friendships = db.relationship(
        "User",
        secondary="friendships",
        primaryjoin=friendships.c.userA_id == id,
        secondaryjoin=friendships.c.userB_id == id,
        backref="friends" #barely know what this means, I think it creates another association for the other end of the friendship?
        )
    comments = db.relationship('Comment', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "profilePicURL": self.profile_picture_url,
            "coverPhotoURL": self.cover_photo_url,
            "gender": self.gender,
            "age": self.age,
            "createdAt": self.created_at # TODO: maybe convert to string here?
       }
