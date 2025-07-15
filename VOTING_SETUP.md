# SA Chefs Association Voting System - Complete Setup Guide

## Overview

This voting system collects votes for the SA Chefs Association Board of Directors election, stores them in a Supabase database, and automatically sends confirmation emails using NodeMailer. It includes a password-protected admin panel to view voting results.

## Features

- ✅ Vote collection with validation (2-6 candidates)
- ✅ Database storage with Prisma + Supabase
- ✅ Duplicate vote prevention by email address
- ✅ Automatic confirmation emails to voters
- ✅ Admin notification emails
- ✅ Password-protected admin dashboard
- ✅ Real-time vote counting and analytics
- ✅ Regional and membership category breakdowns
- ✅ Professional email templates
- ✅ POPI Act compliance confirmation
- ✅ Form validation and error handling

## Quick Start

1. **Database Setup**: Follow [DATABASE_SETUP.md](./DATABASE_SETUP.md) to configure Supabase
2. **Environment Setup**: Copy `.env.example` to `.env.local` and configure
3. **Install Dependencies**: `pnpm install`
4. **Generate Prisma Client**: `npx prisma generate`
5. **Push Database Schema**: `npx prisma db push`
6. **Start Development**: `pnpm dev`

## Environment Variables

Create a `.env.local` file with:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@db.supabase.co:5432/postgres"

# Email Configuration
SMTP_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Configuration
ADMIN_EMAIL=admin@yourdomain.com,admin2@yourdomain.com
ADMIN_PASSWORD=your-secure-admin-password
```

## API Endpoints

### `/api/submit-vote` (POST)

Handles vote submissions, saves to database, and sends confirmation emails.

**Request Body:**

```json
{
  "membershipDetails": {
    "name": "John Doe",
    "membershipNumber": "12345",
    "membershipCategory": "professional",
    "email": "john@example.com",
    "region": "gauteng"
  },
  "selectedVotes": ["candidate1", "candidate2"],
  "timestamp": "2024-03-01T10:00:00.000Z"
}
```

**Features:**

- Validates vote count (2-6 candidates)
- Prevents duplicate votes by email address
- Saves to database with analytics
- Sends confirmation email to voter
- Sends notification email to admin
- Returns detailed response with success status

### `/api/admin/login` (POST)

Authenticates admin users for dashboard access.

### `/api/admin/vote-results` (GET)

Returns voting results and analytics (requires authentication).

**Response:**

```json
{
  "success": true,
  "totalVoters": 150,
  "totalVotes": 850,
  "analyticsByCandidate": [
    {
      "candidateId": "1",
      "candidateName": "Alex Johnson",
      "voteCount": 125,
      "gautengVotes": 45,
      "westernCapeVotes": 30,
      "professionalVotes": 80,
      "intermediateVotes": 45
    }
  ]
}
```

## Admin Dashboard

Access the admin panel at `/admin`:

1. **Password Protection**: Enter admin password to access
2. **Real-time Results**: View current vote counts for all candidates
3. **Regional Breakdown**: See votes by province
4. **Membership Category Analysis**: Professional vs. Intermediate vs. Foreign-based
5. **Refresh Data**: Update results in real-time
6. **Secure Logout**: Clear authentication session

### Admin Features:

- **Total Voters**: Count of unique voters
- **Total Votes**: Sum of all votes cast
- **Candidate Rankings**: Sorted by vote count
- **Regional Distribution**: Votes per province
- **Category Breakdown**: Votes by membership type
- **Data Export**: View detailed analytics

## Database Schema

### Vote Storage (`votes` table):

- **Voter Information**: Name, membership number, email, region, category
- **Vote Data**: Array of selected candidate IDs
- **Metadata**: Submission timestamp, IP address, user agent
- **Email Tracking**: Confirmation status and message ID
- **Duplicate Prevention**: Unique constraint on membership number

### Analytics (`vote_analytics` table):

- **Vote Counts**: Total votes per candidate
- **Regional Breakdown**: Votes by province (9 provinces)
- **Category Breakdown**: Professional, Intermediate, Foreign-based
- **Real-time Updates**: Automatically updated on each vote

### Candidates (`candidates` table):

- **Basic Info**: Name, bio, image URL
- **Management**: Active status, position ordering
- **Future Use**: For managing candidate information

## Email System

### Voter Confirmation Email:

- **Professional Design**: HTML template with SA Chefs branding
- **Vote Details**: Complete voting information and selections
- **Receipt Function**: Serves as official voting receipt
- **POPI Compliance**: Includes privacy and data usage information

### Admin Notification Email:

- **Instant Alerts**: Immediate notification of new votes
- **Multiple Recipients**: Supports multiple admin email addresses (comma-separated)
- **Voter Summary**: Key information about the voter
- **Vote Analysis**: Quick overview of selections made

## Security Features

- **Duplicate Prevention**: Email addresses can only vote once
- **Password Protection**: Admin panel requires authentication
- **Input Validation**: Comprehensive form and data validation
- **Rate Limiting**: Built-in protection against spam (optional)
- **IP Tracking**: Optional IP address logging for security
- **Secure Sessions**: HTTP-only cookies for admin authentication

## Vote Validation

The system validates:

- **Vote Count**: Minimum 2, maximum 6 candidates
- **Required Fields**: Name, membership number, email
- **Email Format**: Valid email address format
- **Duplicate Votes**: Prevents same email address voting twice
- **POPI Acceptance**: Requires acceptance of data usage terms

## Data Analytics

### Real-time Tracking:

- **Vote Counts**: Live updates for each candidate
- **Regional Analysis**: Distribution across 9 provinces
- **Category Breakdown**: Professional, Intermediate, Foreign-based members
- **Participation Metrics**: Total voters and votes cast

### Export Options:

- **Database Access**: Direct access via Prisma Studio
- **API Export**: Programmatic access to results
- **Admin Dashboard**: Visual representation of data

## Development

### Run Development Server:

```bash
pnpm dev
```

### Database Operations:

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# View database
npx prisma studio

# Reset database (WARNING: Deletes data)
npx prisma migrate reset
```

### Build for Production:

```bash
pnpm build
pnpm start
```

## Production Deployment

### Environment Setup:

1. **Database**: Configure production Supabase URL
2. **Email Service**: Use professional email service (SendGrid, Mailgun)
3. **Security**: Use strong admin passwords
4. **Monitoring**: Set up error tracking and monitoring

### Security Checklist:

- [ ] Strong admin password set
- [ ] Database connection secured
- [ ] Email credentials protected
- [ ] Rate limiting enabled
- [ ] Input sanitization active
- [ ] HTTPS enabled
- [ ] Regular backups scheduled

## Troubleshooting

### Common Issues:

1. **Database Connection**: Check DATABASE_URL and Supabase status
2. **Email Delivery**: Verify SMTP settings and credentials
3. **Admin Access**: Check ADMIN_PASSWORD in environment
4. **Vote Submission**: Verify form validation and required fields

### Debug Commands:

```bash
# Test database connection
npx prisma studio

# Check environment variables
echo $DATABASE_URL

# View application logs
pnpm dev (check terminal output)
```

## Support

For technical issues:

1. Check [DATABASE_SETUP.md](./DATABASE_SETUP.md) for database issues
2. Verify environment variables in `.env.local`
3. Check browser console for client-side errors
4. Review server logs for API errors
5. Test email delivery with admin notifications

## Future Enhancements

Potential improvements:

- **Real-time Dashboard**: WebSocket updates for live results
- **Advanced Analytics**: More detailed reporting and charts
- **User Management**: Multiple admin users with different permissions
- **Export Features**: CSV/PDF export of results
- **Audit Trail**: Detailed logging of all system activities
- **Mobile App**: Native mobile application for voting
