from extensions import db

class Medals(db.Model):    
    __tablename__ = 'medals'

    id = db.Column('id', db.Integer(), primary_key=True)
    medal = db.Column('medal', db.String(20), unique=True) 

    athlete_participation = db.relationship('AthleteParticipations', back_populates='medal')

    def __init__(self, id, medal):
        self.id = id
        self.medal = medal
    
    def __repr__(self):
        return f'\nid: {self.id}, Медаль: {self.medal}'
    