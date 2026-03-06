from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()



class Countries(db.Model):
    __tablename__ = 'countries'

    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    code = db.Column('code', db.String(3), unique=True)
    country = db.Column('country', db.String(100))
    first_participation_year = db.Column('first_participation_year', db.Integer)
    best_rank = db.Column('best_rank', db.Integer)

    athletes = db.relationship('Athletes', back_populates='country', cascade="all, delete")
    
    def __init__(self, id, code, country, first_participation_year, best_rank):
        self.id = id
        self.code = code
        self.country = country
        self.first_participation_year = first_participation_year
        self.best_rank = best_rank
    
    def __repr__(self):
        return f'\nid: {self.id}, Код: {self.code}, Страна: {self.country}, Первый год участия: {self.first_participation_year}, best_rank: {self.best_rank}'
    
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
    
class Games(db.Model):
    __tablename__ = 'games'

    id = db.Column('id', db.Integer(), primary_key=True)
    year = db.Column('year', db.Integer())
    games_type = db.Column('games_type', db.String(10))
    host_city = db.Column('host_city', db.String(100))

    athlete_participation = db.relationship('Athlete_Participations', back_populates="games", cascade="all, delete")
    
    
    def __init__(self, id, year, games_type, host_city):
        self.id = id
        self.year = year
        self.games_type = games_type
        self.host_city = host_city
    
    def __repr__(self):
        return f'\nid: {self.id}, Год: {self.year}, Период: {self.games_type}, Город: {self.host_city}'
    
class Coaches(db.Model):
    __tablename__ = 'coaches'
    
    id = db.Column('id', db.String(20), primary_key=True)    
    name = db.Column('name', db.String(150))

    athlete_participation = db.relationship('Athlete_Participations', back_populates="coach", cascade="all, delete")
    
    def __init__(self, id, name):
            self.id = id
            self.name = name

    def __repr__(self):
        return f'\nid: {self.id}, ФИО: {self.name}'
    
class Athlete_Participations(db.Model):

    __tablename__ = 'athlete_participations'

    id = db.Column('id', db.Integer(), primary_key=True)
    games_id = db.Column(db.Integer, db.ForeignKey("games.id"))
    athlete_id = db.Column(db.String(20), db.ForeignKey("athletes.id"))
    event_id = db.Column(db.String(20), db.ForeignKey("events.id"))
    coach_id = db.Column(db.String(20), db.ForeignKey("coaches.id"))
    medal_id = db.Column(db.Integer, db.ForeignKey("medals.id"))
    result_value = db.Column('result_value', db.Numeric(10, 3))
    result_unit = db.Column('result_unit', db.String(50))
    is_record_holder = db.Column('is_record_holder', db.String(20))
    notes  = db.Column('notes', db.Text())

    games = db.relationship('Games', back_populates="athlete_participation")
    athlete = db.relationship('Athletes', back_populates="athlete_participation")
    coach = db.relationship('Coaches', back_populates="athlete_participation")
    medal = db.relationship('Medals', back_populates="athlete_participation")
    event = db.relationship('Events', back_populates="athlete_participation")

    def __init__(self, id, athlete_id, games_id, event_id, coach_id, medal_id, result_value, result_unit,is_record_holder,notes):
        self.id = id
        self.athlete_id = athlete_id
        self.games_id = games_id
        self.event_id = event_id
        self.coach_id = coach_id
        self.medal_id = medal_id
        self.result_value = result_value
        self.result_unit = result_unit
        self.is_record_holder = is_record_holder
        self.notes = notes
    
    def __repr__(self):
        return f'\nid: {self.id}, ФИО: {self.athlete_id}, Пол: {self.games_id}, \
        Дата рождения: {self.event_id}, coach_id: {self.coach_id}, \
        medal_id: {self.medal_id}, result_value: {self.result_value}, \
        result_unit: {self.result_unit}, is_record_holder: {self.is_record_holder}, \
        notes: {self.notes}'
    
class Medals(db.Model):    
    __tablename__ = 'medals'

    id = db.Column('id', db.Integer(), primary_key=True)
    medal = db.Column('medal', db.String(20), unique=True) # Gold, Silver, Bronze, No Medal

    athlete_participation = db.relationship('Athlete_Participations', back_populates='medal')

    def __init__(self, id, medal): # id,year,games_type,host_city
        self.id = id
        self.medal = medal
    
    def __repr__(self):
        return f'\nid: {self.id}, Медаль: {self.medal}'
    
class Sports(db.Model):
    __tablename__ = 'sports'
    
    id = db.Column('id', db.String(20), primary_key=True)    
    sport = db.Column('sport', db.String(100))

    events = db.relationship(
        "Events",
        secondary="events_sports",
        back_populates="sports"
    )

    def __init__(self, id, sport):
        self.id = id
        self.sport = sport
    
    def __repr__(self):
        return f'\nid: {self.id}, Спорт: {self.sport}'

class Events(db.Model):
    __tablename__ = 'events'
    
    id = db.Column('id', db.String(20), primary_key=True)
    event = db.Column('event', db.String(100))
    team_or_individual = db.Column('team_or_individual', db.String(20))

    athlete_participation = db.relationship('Athlete_Participations', back_populates='event')
    sports = db.relationship(
        "Sports",
        secondary="events_sports",
        back_populates="events"
    )

    # id,event,team_or_individual
    
    def __init__(self, id, event, team_or_individual):
        self.id = id
        self.event = event
        self.team_or_individual = team_or_individual
    
    def __repr__(self):
        return f'\nid: {self.id}, Событие: {self.event}, team_or_individual: {self.team_or_individual}'

class EventsSports(db.Model):
    __tablename__ = "events_sports"

    sport_id = db.Column(db.String(20), db.ForeignKey("sports.id"), primary_key=True)
    event_id = db.Column(db.String(20), db.ForeignKey("events.id"), primary_key=True)
    
    def __init__(self, id_sport, id_event):
            self.sport_id = id_sport
            self.event_id = id_event

    def __repr__(self):
        return f'\nid_sport: {self.sport_id}, id_event: {self.event_id}'