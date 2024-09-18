"use client";

import React, { useContext, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { UserContext } from "@/app/context/UserContext";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';

const MyCards = ({ color, type }) => {
  const { user } = useContext(UserContext);
  const [showBalance, setShowBalance] = useState(true);
  const [showCVU, setShowCVU] = useState(false);

  const toggleBalanceVisibility = () => setShowBalance(!showBalance);
  const toggleCVUVisibility = () => setShowCVU(!showCVU);

  const renderCardContent = () => (
    <>
      {type === "savings" ? (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">
              Cuenta ID: {user?.id || "Desconocido"}
            </Typography>
            <div
              onClick={toggleBalanceVisibility}
              style={{ cursor: "pointer" }}
            >
              {showBalance ? (
                <VisibilityIcon style={{ color: "white" }} />
              ) : (
                <VisibilityOffIcon style={{ color: "white" }} />
              )}
            </div>
          </Box>
          <Box
            display="flex"
            mt={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4">
              Saldo: {showBalance ? `$${user?.saldoPesos || "0.00"}` : "******"}
            </Typography>
          </Box>
          <Box display="flex" mt={4} alignItems="center">
            <Typography
              variant="body2"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={toggleCVUVisibility}
            >
              {showCVU ? `CVU: ${user?.cvu || "No disponible"}` : "Ver CVU"}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2">Titular de la tarjeta</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">{user?.name || "Usuario"}</Typography>
          <Image
              width={80}
              height={20}
              src={`/cards_types/${user?.cards[0].name}.png`}	
              alt={user?.cards[0].name || "Usuario"}
              priority
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body2">VÁLIDA HASTA</Typography>
            <Typography variant="body2">
              {user?.cards[0].expiration || "12/29"}
            </Typography>
          </Box>
          <Typography variant="h6" mt={2} display="flex" justifyContent="space-between" >
            {user?.cards[0].numeroTarjeta || "**** **** **** ****"}
            <Typography
              variant="body2"
              sx={{ textDecoration: "underline", cursor: "pointer"   }}
              onClick={toggleCVUVisibility}

            >
              {showCVU ? ` ${user?.cards[0].cvv || "No disponible"}` : "Ver CVV"}
            </Typography>
          </Typography>

        </>
      )}
    </>
  );

  return (
    <Card sx={{ 
      backgroundColor: color, 
      color: '#fff', 
      padding: '16px', 
      borderRadius: '12px', 
      minHeight: '200px', 
      backgroundImage: type === 'savings' ? 'url(/Balance.png)' : 'none', 
      backgroundSize: 'cover' 
    }}>
      <CardContent>
        {renderCardContent()}
      </CardContent>
    </Card>
  );
};

export default MyCards;
