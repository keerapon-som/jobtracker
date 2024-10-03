-- CREATE TABLE public.jobscrape_list (
--     id SERIAL PRIMARY KEY,
--     jobname TEXT NOT NULL, UNIQUE(jobname),
--     getjobsCount boolean DEFAULT false,
--     getjobsDetails boolean DEFAULT false,
--     getjobsSuperDetails boolean DEFAULT false,
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

	-- Sunday Weekday = iota
	-- Monday
	-- Tuesday
	-- Wednesday
	-- Thursday
	-- Friday
	-- Saturday

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE public.scheduletask (
    id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid(),
    taskname TEXT NOT NULL,
    tasktype TEXT NOT NULL,
    taskstatus TEXT NOT NULL,
    taskdescription TEXT,
    hours_trigger INTEGER NOT NULL,
    minute_trigger INTEGER NOT NULL,
    list_weekdays_trigger TEXT[] NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert a row
INSERT INTO public.scheduletask (
    taskname, tasktype, taskstatus, taskdescription, hours_trigger, minute_trigger, list_weekdays_trigger
) VALUES (
    'Daily Backup', 'Backup', 'Pending', 'Perform daily backup of the database', 2, 30, ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
);