from app.extensions import db

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
    