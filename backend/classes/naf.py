from database import db

class Naf(db.Model):
    __tablename__ = "naf"

    id_naf = db.Column(db.Integer, primary_key=True)
    code_sous_classe = db.Column(db.String(255))
    libelle_sous_classe = db.Column(db.String(255))
    code_sous_classe_short = db.Column(db.String(255))
    code_classe = db.Column(db.String(255))
    libelle_classe = db.Column(db.String(255))
    code_classe_short = db.Column(db.String(255))
    code_groupe = db.Column(db.String(255))
    libelle_groupe = db.Column(db.String(255))
    code_groupe_short = db.Column(db.String(255))
    code_division = db.Column(db.String(255))
    libelle_division = db.Column(db.String(255))
    code_section = db.Column(db.String(255))
    libelle_section = db.Column(db.String(255))

    def __init__(self, code_sous_classe, libelle_sous_classe, code_sous_classe_short, code_classe, libelle_classe, code_classe_short, code_groupe, libelle_groupe, code_groupe_short, code_division, libelle_division, code_section, libelle_section):

        self.code_sous_classe = code_sous_classe
        self.libelle_sous_classe = libelle_sous_classe
        self.code_sous_classe_short = code_sous_classe_short
        self.code_classe = code_classe
        self.libelle_classe = libelle_classe
        self.code_classe_short = code_classe_short
        self.code_groupe = code_groupe
        self.libelle_groupe = libelle_groupe
        self.code_groupe_short = code_groupe_short
        self.code_division = code_division
        self.libelle_division = libelle_division
        self.code_section = code_section
        self.libelle_section = libelle_section
    
    def __repr__(self):
        return '%s/%s/%s/%s/%s/%s/%s/%s/%s/%s/%s/%s/%s/%s' % (self.code_sous_classe, self.libelle_sous_classe, self.code_sous_classe_short, self.code_classe, self.libelle_classe, self.code_classe_short, self.code_groupe, self.libelle_groupe, self.code_groupe_short, self.code_division, self.libelle_division, self.code_section, self.libelle_section)

