import React from 'react';
import { motion } from "motion/react";

const SellerStatistics = () => {
    return (
        <div>
      <motion.h3
        animate={{
          color: ["#ff5733", "#33ff33","#7D0552", "#8a33ff","#0909FF","#800080","#583759","#FF00FF","#FA2A55","#FF8C00","#665D1E","#665D1E","#EED202","#ADFF2F","#B2C248","#7DFDFE"],
          transition: { duration: 5, repeat: Infinity },
        }}
        className="text-2xl md:text-4xl lg:text-7xl  text-center"
      >
        WellCome My Seller Statistics Page
      </motion.h3>
    </div>
    );
};

export default SellerStatistics;