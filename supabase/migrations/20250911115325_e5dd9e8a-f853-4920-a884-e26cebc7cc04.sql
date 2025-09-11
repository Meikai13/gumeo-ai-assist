-- Fix the profiles table RLS policies to allow the handle_new_user trigger to work
-- The trigger runs as the supabase_auth_admin user, so we need to allow it to insert profiles

-- First, let's check if we need to recreate the trigger to handle the RLS issue
-- We'll modify the function to use the SECURITY DEFINER to run with elevated privileges

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER -- This allows the function to run with the privileges of the function owner
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$function$;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Also add a policy to allow the service role to insert profiles
CREATE POLICY "Allow service role to insert profiles" ON public.profiles
  FOR INSERT
  WITH CHECK (true);