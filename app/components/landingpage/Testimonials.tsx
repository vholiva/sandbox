import React from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import ChikenImage from '@/public/images/chiken image.jpg';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'HR Manager',
    avatar: ChikenImage.src,
    content:
      "The AI integration has revolutionized our HR processes. We're now able to handle employee queries more efficiently than ever before."
  },
  {
    name: 'Michael Chen',
    role: 'Financial Analyst',
    avatar: ChikenImage.src,
    content:
      "The real-time updates feature has been a game-changer for our financial forecasting. We're always working with the most current data."
  },
  {
    name: 'Emily Rodriguez',
    role: 'Operations Director',
    avatar: ChikenImage.src,
    content:
      "The deep insights provided by this platform have helped us identify and resolve operational bottlenecks we didn't even know existed."
  },
  {
    name: 'David Kim',
    role: 'Compliance Officer',
    avatar: ChikenImage.src,
    content:
      "Having all our guidelines and protocols in one place has significantly improved our compliance rates. It's user-friendly and always up-to-date."
  },
  {
    name: 'Lisa Patel',
    role: 'Team Lead',
    avatar: ChikenImage.src,
    content:
      "The absence management features have streamlined our leave approval process. It's made my job as a team lead much easier."
  },
  {
    name: 'Robert Taylor',
    role: 'CFO',
    avatar: ChikenImage.src,
    content:
      "The financial information section is comprehensive and well-organized. It's become an indispensable tool for our finance department."
  }
];

const Testimonials: React.FC = () => {
  return (
    <Box
      id="testimonials"
      sx={{
        maxWidth: '1800px',
        mx: 'auto',
        mt: 2,
        mb: 4
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'Monospace',
          letterSpacing: '0.1em',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          backgroundGradient: 'linear(to r, white, grey.500)',
          pb: 2
        }}
      >
        What Our Users Say
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          maxWidth: 800,
          mx: 'auto',
          fontFamily: 'Monospace',
          letterSpacing: '0.05em',
          pb: 2
        }}
      >
        Real Experiences from Satisfied Customers
      </Typography>

      <Grid2 container spacing={4}>
        {testimonials.map((testimonial, index) => (
          <Grid2
            size={{
              xs: 12,
              sm: 6,
              md: 4
            }}
            key={index}
            sx={{
              display: 'flex',
              p: 2,
              borderRadius: '8px',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 3,
              backgroundColor: 'background.paper'
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 2,
                flexGrow: 1
              }}
            >
              &ldquo;{testimonial.content}&rdquo;
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  mr: 2
                }}
              >
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {testimonial.role}
                </Typography>
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Testimonials;
