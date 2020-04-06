CREATE TABLE global_stat
(
	id_stat SERIAL PRIMARY KEY NOT NULL,
    dimension CHARACTER VARYING,
    sous_dimension CHARACTER VARYING,
    valeur_sous_dimension CHARACTER VARYING,
    total_siret DECIMAL(9,2),
    delta_effectif_total DECIMAL(15,2),
    delta_effectif_percent_mean DECIMAL(9,2)
)
TABLESPACE pg_default;


