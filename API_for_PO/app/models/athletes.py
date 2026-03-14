from app.extensions import db

class Athletes(db.Model):
    __tablename__ = 'athletes'

    id = db.Column('id', db.String(20), primary_key=True)
    name = db.Column('name', db.String(150))
    gender = db.Column('gender', db.String(10))
    birth_date = db.Column('birth_date', db.DateTime())
    country_id = db.Column('country_id', db.Integer, db.ForeignKey('countries.id'))
    height = db.Column('height', db.Integer())
    weight = db.Column('weight', db.Integer())

    country = db.relationship('Countries', back_populates="athletes")
    athlete_participation = db.relationship('Athlete_Participations', back_populates="athlete", cascade="all, delete")

    def __init__(self, id, name, gender, birth_date, height, weight, country_id):
        self.id = id
        self.name = name
        self.gender = gender
        self.birth_date = birth_date
        self.height = height
        self.weight = weight
        self.country_id = country_id
    
    def __repr__(self):
        return f'\nid: {self.id}, ФИО: {self.name}, Пол: {self.gender}, Дата рождения: {self.birth_date}, height: {self.height}, weight: {self.weight}, country_id: {self.country_id}'
    