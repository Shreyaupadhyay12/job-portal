
-- Create storage bucket for company logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('company-logos', 'company-logos', true);

-- Create policy to allow anyone to view company logos
CREATE POLICY "Anyone can view company logos" ON storage.objects
FOR SELECT USING (bucket_id = 'company-logos');

-- Create policy to allow authenticated users to upload company logos
CREATE POLICY "Authenticated users can upload company logos" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'company-logos' AND auth.role() = 'authenticated');

-- Create policy to allow users to update company logos
CREATE POLICY "Authenticated users can update company logos" ON storage.objects
FOR UPDATE USING (bucket_id = 'company-logos' AND auth.role() = 'authenticated');

-- Create policy to allow users to delete company logos
CREATE POLICY "Authenticated users can delete company logos" ON storage.objects
FOR DELETE USING (bucket_id = 'company-logos' AND auth.role() = 'authenticated');
