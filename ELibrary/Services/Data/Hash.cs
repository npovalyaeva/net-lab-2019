﻿using System.Security.Cryptography;
using System.Text;

namespace ELibrary.Data
{
    public static class Hash
    {
        public static string FindHash(string input)
        {
            byte[] tmpSource = Encoding.ASCII.GetBytes(input);
            byte[] tmpHash = new MD5CryptoServiceProvider().ComputeHash(tmpSource);
            return ByteArrayToString(tmpHash);
        }

        private static string ByteArrayToString(byte[] arrInput)
        {
            int i;
            StringBuilder sOutput = new StringBuilder(arrInput.Length);
            for (i = 0; i < arrInput.Length; i++)
            {
                sOutput.Append(arrInput[i].ToString("X2"));
            }
            return sOutput.ToString();
        }
    }
}
