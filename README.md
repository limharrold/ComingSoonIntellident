# Intellident Coming Soon Page

A beautiful, responsive coming soon page that matches the Intellident website design theme.

## 📁 Files Created

- `index.html` - Main coming soon page
- `styles.css` - Styling that matches Intellident's design theme
- `script.js` - Interactive features and countdown timer
- `README.md` - This documentation

## 🎨 Design Features

✅ **Matches Intellident Theme**
- Same color scheme (#64ada7, #38C7C7, #26B99A)
- Consistent typography (Open Sauce One font)
- Matching gradients and animations
- Same visual style as main website

✅ **Interactive Elements**
- Live countdown timer
- Email notification signup
- Animated floating particles
- Smooth hover effects
- Responsive design for all devices

✅ **Professional Features**
- Email validation
- Loading states
- Success/error feedback
- Local storage for email collection
- SEO optimized with meta tags

## ⚙️ Customization

### 1. Launch Date
Currently set to **November 3, 2025**. To change this, edit `script.js` line 9:
```javascript
// Current setting:
const launchDate = new Date('2025-11-03T00:00:00');

// To change to a different date:
// const launchDate = new Date('2025-12-25T00:00:00'); // Christmas 2025
```

### 2. Update Content
Edit `index.html` to change:
- Main title text
- Subtitle/description
- Feature descriptions
- Footer text

### 3. Email Collection
Currently stores emails in localStorage. To connect to your backend:

Edit `script.js` around line 75:
```javascript
function storeEmail(email) {
    // Replace this with your API endpoint
    fetch('https://your-api.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}
```

### 4. Colors & Styling
All colors are defined in `styles.css` using CSS variables. Main colors:
- Primary Teal: `#64ada7`
- Secondary Cyan: `#38C7C7`
- Accent Green: `#26B99A`

## 🚀 Deployment to Vercel

1. **Upload to Vercel:**
   - Drag and drop the entire "Coming Soon" folder to Vercel
   - Or connect your GitHub repository

2. **Custom Domain:**
   - In Vercel dashboard, go to your project
   - Click "Domains" tab
   - Add your Namecheap domain
   - Follow DNS configuration instructions

3. **DNS Setup (Namecheap):**
   - Log into Namecheap
   - Go to Domain List → Manage
   - Advanced DNS tab
   - Add these records:
     ```
     Type: CNAME  |  Host: www  |  Value: your-project.vercel.app
     Type: A      |  Host: @    |  Value: 76.76.19.61
     ```

## 📱 Mobile Responsive

The page is fully responsive and tested on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📊 Analytics

To add Google Analytics, add this to the `<head>` section of `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📋 To-Do for Production

- [ ] Set up email collection backend API
- [ ] Add Google Analytics
- [ ] Set actual launch date
- [ ] Test email notifications
- [ ] Add social media links
- [ ] Configure domain DNS
- [ ] Test on all devices

## 🎯 Launch Checklist

When ready to launch:
1. Update countdown date in `script.js`
2. Connect email API endpoint
3. Upload to Vercel
4. Configure domain DNS
5. Test everything works
6. Share the link!

---

**Ready to deploy!** 🚀 Your coming soon page perfectly matches the Intellident brand and will create excitement for your launch. 