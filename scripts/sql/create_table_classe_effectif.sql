CREATE TABLE classeeffectif
(
	id_classe_effectif SERIAL PRIMARY KEY NOT NULL,
    denomination CHARACTER VARYING,
    libelle CHARACTER VARYING,
    libelle_long CHARACTER VARYING,
    color CHARACTER VARYING
)
TABLESPACE pg_default;