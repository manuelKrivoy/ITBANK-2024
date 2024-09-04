import React, { useContext, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { UserContext } from '../../context/UserContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisaLogo from '../../assets/visa.png';
import BalanceBg from '../../assets/balance-bg.png';

const MyCards = ({ color, type }) => {
  const { user } = useContext(UserContext);
  const [showBalance, setShowBalance] = useState(true);
  const [showCVU, setShowCVU] = useState(false);

  const toggleBalanceVisibility = () => setShowBalance(!showBalance);
  const toggleCVUVisibility = () => setShowCVU(!showCVU);

  const renderCardContent = () => (
    <>
      {type === 'savings' ? (
        <>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Cuenta ID: {user?.['user-id'] || "Desconocido"}</Typography>
            <div onClick={toggleBalanceVisibility} style={{ cursor: 'pointer' }}>
              {showBalance ? <VisibilityIcon style={{ color: 'white' }} /> : <VisibilityOffIcon style={{ color: 'white' }} />}
            </div>
          </Box>
          <Box display="flex" mt={2} alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Saldo: {showBalance ? `$${user?.saldoPesos || "0.00"}` : "******"}</Typography>
          </Box>
          <Box display="flex" mt={4} alignItems="center">
            <Typography variant="body2" sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={toggleCVUVisibility}>
              {showCVU ? `CVU: ${user?.cvu || "No disponible"}` : "Ver CVU"}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">Titular de la tarjeta</Typography>
            <img src={VisaLogo} alt="Visa" style={{ width: '40px', height: 'auto' }} />
          </Box>
          <Typography variant="h6">{user?.name || "Usuario"}</Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body2">VÁLIDA HASTA</Typography>
            <Typography variant="body2">{user?.expiryDate || "12/29"}</Typography>
          </Box>
          <Typography variant="h6" mt={2}>{user?.numeroTarjeta || "**** **** **** ****"}</Typography>
        </>
      )}
    </>
  );

  return (
    <Card sx={{ 
      backgroundColor: type === 'savings' ? 'transparent' : color, 
      color: '#fff', 
      padding: '16px', 
      borderRadius: '12px', 
      minHeight: '200px', 
      backgroundImage: type === 'savings' ? `url(${BalanceBg})` : 'none', 
      backgroundSize: 'cover' 
    }}>
      <CardContent>
        {renderCardContent()}
      </CardContent>
    </Card>
  );
};

export default MyCards;
