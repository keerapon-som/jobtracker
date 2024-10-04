CREATE TABLE public.jobsdatadetails (
    id INTEGER PRIMARY KEY NOT NULL,
    advertiser_id TEXT NOT NULL,
    advertiser_name TEXT NOT NULL,
    area TEXT NOT NULL,
    area_id INTEGER NOT NULL,
    area_where_value TEXT NOT NULL,
    country_code TEXT NOT NULL,
    listing_date TIMESTAMP NOT NULL,
    role_id TEXT NOT NULL,
    title TEXT NOT NULL,
    salary TEXT NOT NULL,
    teaser TEXT NOT NULL,
    work_type TEXT NOT NULL,
    latest_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    superdetail JSONB,
);

INSERT INTO public.jobsdatadetails (
    id, advertiser_id, advertiser_name, area, area_id, area_where_value, country_code, listing_date, role_id, title, salary, teaser, work_type, latest_update, error
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP, $14
) ON CONFLICT (id) DO UPDATE SET
    advertiser_id = EXCLUDED.advertiser_id,
    advertiser_name = EXCLUDED.advertiser_name,
    area = EXCLUDED.area,
    area_id = EXCLUDED.area_id,
    area_where_value = EXCLUDED.area_where_value,
    country_code = EXCLUDED.country_code,
    listing_date = EXCLUDED.listing_date,
    role_id = EXCLUDED.role_id,
    title = EXCLUDED.title,
    salary = EXCLUDED.salary,
    teaser = EXCLUDED.teaser,
    work_type = EXCLUDED.work_type,
    latest_update = CURRENT_TIMESTAMP;