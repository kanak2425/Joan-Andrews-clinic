type ApiRequest = {
  method?: string;
  body?: unknown;
};
type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(503).json({ error: 'Booking service is not configured yet.' });
  }

  const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;
  const fullName = typeof body.fullName === 'string' ? body.fullName.trim().slice(0, 120) : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 40) : '';
  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 254) : '';
  const service = typeof body.service === 'string' ? body.service.trim().slice(0, 120) : '';
  const preferredDate = typeof body.preferredDate === 'string' ? body.preferredDate : null;
  const preferredTime = typeof body.preferredTime === 'string' ? body.preferredTime.trim().slice(0, 40) : null;
  const preferredTimeWindow = typeof body.preferredTimeWindow === 'string' ? body.preferredTimeWindow.trim().slice(0, 40) : null;
  const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 2000) : '';

  if (!fullName || !phone) {
    return res.status(400).json({ error: 'Full name and phone number are required.' });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }
  if (preferredDate && !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    return res.status(400).json({ error: 'Preferred date must use YYYY-MM-DD.' });
  }

  try {
    const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/consultation_requests`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        full_name: fullName,
        phone,
        email: email || null,
        service: service || 'Consultation',
        preferred_date: preferredDate || null,
        preferred_time: preferredTime,
        preferred_time_window: preferredTimeWindow,
        notes: notes || null,
        source: 'joan-andrews-clinic-website',
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Supabase insert failed:', response.status, detail);
      return res.status(502).json({ error: 'We could not save your request. Please call the clinic directly.' });
    }

    return res.status(201).json({ success: true, message: 'Consultation request saved.' });
  } catch (error) {
    console.error('Consultation API error:', error);
    return res.status(502).json({ error: 'Booking service is temporarily unavailable. Please call the clinic directly.' });
  }
}
