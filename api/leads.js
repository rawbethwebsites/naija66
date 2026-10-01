export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const lead = await request.json();
    
    // Validate required fields
    if (!lead.whatsapp) {
      return new Response(
        JSON.stringify({ error: 'WhatsApp number is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add metadata
    const processedLead = {
      ...lead,
      capturedAt: Date.now(),
      submittedAt: Date.now(),
      submittedVia: 'vercel-edge-api'
    };

    // Log the lead (in production, this would save to a database or webhook)
    console.log('Lead captured:', JSON.stringify(processedLead, null, 2));

    // Return success
    return new Response(
      JSON.stringify({ 
        success: true, 
        id: processedLead.capturedAt,
        message: 'Lead saved successfully'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error saving lead:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to save lead' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
