using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.ViewModels.User
{
    public class BlockUserModel
    {
        public int UserId { get; set; }
        public string BlockingReason { get; set; }
    }
}
