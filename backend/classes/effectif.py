from database import db

class Effectif(db.Model):
    __tablename__ = "effectif"

    id_effectif = db.Column(db.Integer, primary_key=True)
    siret = db.Column(db.String(255))
    daterecuperationeffectif = db.Column(db.Date)
    effectif = db.Column(db.Float)

    def __init__(self, siret, daterecuperationeffectif, effectif):

        self.siret = siret
        self.daterecuperationeffectif = daterecuperationeffectif
        self.effectif = effectif
    
    def __repr__(self):
        return '%s/%s/%s' % (self.siret, self.daterecuperationeffectif, self.effectif)

