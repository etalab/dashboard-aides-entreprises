CREATE TABLE effectif
(
	id_effectif SERIAL PRIMARY KEY NOT NULL,
    siret CHARACTER VARYING,
    dateRecuperationEffectif date default NULL,
    effectif DECIMAL(9,2)
)
TABLESPACE pg_default;