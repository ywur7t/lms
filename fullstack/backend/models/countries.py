from extensions import db

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
    