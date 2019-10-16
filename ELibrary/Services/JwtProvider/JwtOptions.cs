using Microsoft.IdentityModel.Tokens;
using System;

namespace Services.JwtProvider
{
    public class JwtOptions
    {
        public JwtOptions(string audience,
                          string issuer,
                          SecurityKey key,
                          string tokenName,
                          TimeSpan? expiration = null,
                          string algorithm = SecurityAlgorithms.HmacSha256Signature)
        {
            Audience = audience;
            Issuer = issuer;
            Key = key;
            Name = tokenName;
            Expiration = expiration ?? TimeSpan.FromMinutes(30);
            Algorithm = algorithm;
        }

        public JwtOptions(TokenValidationParameters parameters,
                          string tokenName,
                          TimeSpan? expiration = null,
                          string algorithm = SecurityAlgorithms.HmacSha256Signature)
        {
            Audience = parameters.ValidAudience;
            Issuer = parameters.ValidIssuer;
            Key = parameters.IssuerSigningKey;
            Name = tokenName;
            Expiration = expiration ?? TimeSpan.FromMinutes(30);
            Algorithm = algorithm;
        }

        public string Algorithm { get; set; }
        public string Audience { get; }
        public string Issuer { get; }
        public string Name { get; }
        public SecurityKey Key { get; }
        public TimeSpan Expiration { get; }
    }
}
