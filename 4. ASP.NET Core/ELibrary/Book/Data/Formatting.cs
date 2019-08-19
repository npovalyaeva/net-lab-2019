using System;
using System.Collections.Generic;
using System.Text;

namespace Book.Data
{
    public static class Formatting
    {
        /// <summary>
        /// Replaces all single quotes.
        /// </summary>
        /// <param name="text">The text to replace</param>
        /// <returns></returns>
        public static string FormatString(string text)
        {
            return text.Replace("'", "''");
        }
    }
}
