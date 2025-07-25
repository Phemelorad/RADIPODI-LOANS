// First, define supabase correctly
const supabase = supabase.createClient(
  'https://aybfbyewnyaismcglyls.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5YmZieWV3bnlhaXNtY2dseWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODU3OTcsImV4cCI6MjA2ODk2MTc5N30._lUj5eRW4utQ7enh_Tt6xhJAGvhu_SHbytQqkmh_B2M'

);

// Function to check if user is logged in
async function checkSession() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (!session || error) {
    window.location.href = "index.html"; // redirect to login page
  } else {
    const emailDisplay = document.getElementById("user-email");
    if (emailDisplay) {
      emailDisplay.textContent = session.user.email;
    }

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.style.display = "inline-block";
    }
  }
}

// Logout the user
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}

// Expose globally if needed elsewhere
window.supabase = supabase;
window.checkSession = checkSession;
window.logout = logout;

// Run on page load
window.addEventListener("DOMContentLoaded", () => {
  checkSession(); // Automatically check on all pages using this script

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
