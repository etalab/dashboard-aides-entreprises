CREATE TABLE activitepartielle
(
	id_activitepartielle SERIAL PRIMARY KEY NOT NULL,
    reg CHARACTER VARYING,
    code_section_nace17 CHARACTER VARYING,
    nombre_demandes_deposees DECIMAL(15,2),
    nombre_salaries_concernes DECIMAL(15,2),
    nombre_heures_demandees DECIMAL(15,2),
    last_update date default NULL
)
TABLESPACE pg_default;