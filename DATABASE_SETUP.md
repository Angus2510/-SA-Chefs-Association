# Database Setup Guide - SA Chefs Association Voting System

## Overview

This guide will help you set up Prisma with Supabase for the SA Chefs Association voting system.

## Prerequisites

1. **Supabase Account**: Create a free account at [supabase.com](https://supabase.com)
2. **Node.js**: Ensure you have Node.js installed

## Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `sa-chefs-voting`
   - Database Password: (create a strong password)
   - Region: Choose closest to your location
5. Wait for project creation (2-3 minutes)

## Step 2: Get Database Connection String

1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Copy the **URI** connection string
4. It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your actual values:

   ```env
   # Database Configuration
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # Admin Configuration
   ADMIN_EMAIL=admin@yourdomain.com,admin2@yourdomain.com
   ADMIN_PASSWORD=your-secure-admin-password
   ```

   **Note:** You can specify multiple admin email addresses by separating them with commas. All listed emails will receive notifications when new votes are submitted.

## Step 4: Run Database Migrations

1. **Generate Prisma Client** (if not already done):

   ```bash
   npx prisma generate
   ```

2. **Push the schema to your database**:

   ```bash
   npx prisma db push
   ```

3. **Verify the setup**:
   ```bash
   npx prisma studio
   ```
   This opens a web interface to view your database tables.

## Step 5: Seed Initial Data (Optional)

You can add some initial candidate data manually through Prisma Studio or create a seed script.

### Manual Setup via Prisma Studio:

1. Run `npx prisma studio`
2. Go to the `Candidate` model
3. Add your candidates with:
   - `name`: Candidate name
   - `bio`: Candidate biography
   - `imageUrl`: Path to candidate image (e.g., `/chef-1.jpg`)
   - `position`: Order number (0, 1, 2, etc.)
   - `isActive`: true

## Step 6: Test the System

1. **Start the development server**:

   ```bash
   pnpm dev
   ```

2. **Test voting**:

   - Go to `http://localhost:3000`
   - Fill out the membership form
   - Select candidates
   - Submit a test vote

3. **Test admin panel**:
   - Go to `http://localhost:3000/admin`
   - Enter your admin password
   - View voting results

## Database Schema

The system creates the following tables:

### `votes`

Stores individual vote submissions:

- Voter information (name, membership number, email, etc.)
- Selected candidate IDs
- Submission timestamp
- Email confirmation status

### `candidates`

Stores candidate information:

- Name, bio, image URL
- Active status and position ordering

### `vote_analytics`

Stores aggregated vote counts:

- Vote counts per candidate
- Regional breakdown
- Membership category breakdown

### `admin_users`

For future admin user management (currently using simple password)

## Security Features

- **Duplicate Prevention**: Email addresses can only vote once
- **Email Confirmation**: Automatic email confirmations sent to voters
- **Admin Authentication**: Password-protected admin panel
- **Data Validation**: Comprehensive input validation
- **IP Tracking**: Optional IP address logging for security

## Monitoring & Maintenance

### Check Vote Count

```sql
SELECT COUNT(*) as total_votes FROM votes;
```

### View Top Candidates

```sql
SELECT candidate_name, vote_count
FROM vote_analytics
ORDER BY vote_count DESC;
```

### View Regional Distribution

```sql
SELECT
  SUM(gauteng_votes) as gauteng,
  SUM(western_cape_votes) as western_cape,
  SUM(kzn_votes) as kzn
FROM vote_analytics;
```

## Troubleshooting

### Connection Issues

1. Verify DATABASE_URL is correct
2. Check Supabase project is active
3. Ensure password is correctly encoded in URL

### Migration Issues

```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Push schema changes
npx prisma db push
```

### Admin Access Issues

1. Verify ADMIN_PASSWORD in .env.local
2. Clear browser cookies
3. Check browser console for errors

## Production Deployment

1. **Environment Variables**: Set all environment variables in your hosting platform
2. **Database URL**: Use the production Supabase connection string
3. **Email Service**: Consider using professional email services (SendGrid, Mailgun)
4. **Security**:
   - Use strong passwords
   - Enable Supabase RLS (Row Level Security) if needed
   - Consider rate limiting

## Backup

### Export Data

```bash
# Export all votes
npx prisma studio
# Or use Supabase dashboard backup features
```

### Database Backup

Supabase provides automatic backups, but you can also:

1. Go to Supabase Dashboard → Database → Backups
2. Create manual backup before important events

## Support

For issues:

1. Check Supabase logs in dashboard
2. Check application logs in terminal
3. Verify environment variables
4. Test database connection with Prisma Studio
