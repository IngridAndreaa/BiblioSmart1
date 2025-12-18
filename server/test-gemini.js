const dotenv = require('dotenv');
dotenv.config();

async function test() {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key:', apiKey ? apiKey.substring(0, 5) + '...' : 'NONE');

    // 1. List Models
    console.log('\n--- Listing Models ---');
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        if (data.models) {
            data.models.forEach(m => {
                if (m.name.includes('gemini') && m.supportedGenerationMethods.includes('generateContent')) {
                    console.log(`Found: ${m.name}`);
                }
            });
        } else {
            console.error('List models failed:', data);
        }
    } catch (e) {
        console.error('List models error:', e.message);
    }

    // 2. Test Generation
    const modelsToTest = ['gemini-1.5-flash', 'gemini-pro', 'gemini-1.0-pro'];

    console.log('\n--- Testing Generation ---');
    for (const model of modelsToTest) {
        console.log(`Testing ${model}...`);
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: "Hi" }] }]
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log(`✅ SUCCESS with ${model}`);
                console.log(JSON.stringify(data, null, 2));
                return; // Stop on first success
            } else {
                console.log(`❌ FAILED with ${model}: ${data.error?.message || JSON.stringify(data)}`);
            }
        } catch (e) {
            console.log(`❌ ERROR with ${model}: ${e.message}`);
        }
    }
}

test();
