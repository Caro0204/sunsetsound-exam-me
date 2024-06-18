// const endPoint = "https://broken-tinted-wombat.glitch.me/";
const endPoint = "http://localhost:8080/";
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBleHdib2FpZW92cm94amtjenNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ1MDEwNzgsImV4cCI6MjAxMDA3NzA3OH0.6BHSqoC3DM7BXM7_X4Syq5W3u_U5MKO7EPClIkefExs";

export async function getData(param) {
  const res = await fetch(endPoint + param);
  return await res.json();
}

// POST: tilføjer ny booking
export async function addBooking(info) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    fullname: info.fullname,
    address: info.address,
    city: info.city,
    zip: info.zip,
    email: info.email,
    tele: info.tele,
    userid: info.userid,
  });

  let response = await fetch("https://pexwboaieovroxjkczsc.supabase.co/rest/v1/sunsetfest", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();

  return data;
}
